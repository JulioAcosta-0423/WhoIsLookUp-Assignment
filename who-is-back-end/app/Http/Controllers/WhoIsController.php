<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Log;
class WhoisController extends Controller
{
    public function getWhoisInfo(Request $request)
    {
        $request->validate(
            [
                'domain' => ['required', 'string', 'regex:/^([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}$/'],
                'type' => ['required', 'integer', 'in:0,1']
            ]
        );

        $option = $request->type;
        $client = new Client();

        $response = $client->post('https://www.whoisxmlapi.com/whoisserver/WhoisService', [
            'headers' => [
                'Content-Type' => 'application/json',
            ],
            'json' => [
                'domainName' => $request->domain,
                'apiKey' => env('WHOIS_API_KEY'),
                'outputFormat' => 'JSON'
            ],
        ]);

        try {
        $body = $response->getBody()->getContents();
        Log::info('API Response: ' . $body);
        $data = json_decode($body, true);
        if (json_last_error() !== JSON_ERROR_NONE) {
            Log::error('JSON decode error: ' . json_last_error_msg());
            return response()->json(['error' => 'Invalid JSON response from API'], 500);
        }
        if($option === "1"){
            $hostnames = $data['WhoisRecord']['nameServers']['hostNames'];
                $truncatedHostnames = array_map(function ($hostname) {
                    return strlen($hostname) > 25 ? substr($hostname, 0, 25) . '...' : $hostname;
                }, $hostnames);
            $filteredData = [
                'DomainName' => $data['WhoisRecord']['domainName'],
                'Registrar' => $data['WhoisRecord']['registrarName'],
                'RegistrationDate' => $data['WhoisRecord']['createdDateNormalized'],
                'ExpirationDate' => $data['WhoisRecord']['expiresDateNormalized'],
                'EstimatedDomainAge' => $data['WhoisRecord']['estimatedDomainAge'],
                'Hostnames' => $truncatedHostnames,
                'type' => '1'
            ];
        }else{
            $filteredData = [
                'RegistrantName' => $data['WhoisRecord']['registrarName'],
                'TechnicalContactName' => $data['WhoisRecord']['technicalContact']['name'] ?? $data['WhoisRecord']['technicalContact']['organization'],
                'AdministrativeContactName' => $data['WhoisRecord']['administrativeContact']['name'] ?? $data['WhoisRecord']['administrativeContact']['organization'],
                'ContactEmail' =>$data['WhoisRecord']['contactEmail'],
                'type' => '0'
            ];

        }
        return response()->json($filteredData);
        } catch (\Throwable $th) {
            return response()->json([
                'error' => 'It looks like the domain is not registered yet',
                'message' => $th->getMessage()
            ], 500);
        }

    }

}
