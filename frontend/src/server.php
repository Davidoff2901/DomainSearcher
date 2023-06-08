<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

$api = 'your url here';

$defaultApiParams = [
    'auth_username' => 'test',
    'auth_password' => 'test',
    'store_id' => 43121,
];
$ch = curl_init();
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_USERPWD, "devtest:devtest");

if (isset($_GET["getData"])) {
    $command = array_merge($defaultApiParams, [
        'section' => 'products',
        'command' => 'get_registerdomains',
        'periods[]' => '12',
        'periods[]' => '24',
        'currencies[]' => 'USD',
        'prices[]' => 'price',
        'return_type' => 'json'
    ]);
    curl_setopt($ch, CURLOPT_URL, $api . '?' . http_build_query($command));

    if ($err = curl_error($ch)) {
        echo "Request Error: $err";
    } else {
        echo curl_exec($ch);
    }
}

if (isset($_GET["getPlans"])) {
    $command = array_merge($defaultApiParams, [
        'section' => 'products',
        'command' => 'get_plans',
        'return_type' => 'json'
    ]);
    curl_setopt($ch, CURLOPT_URL, $api . '?' . http_build_query($command));
    echo curl_exec($ch);
}
if (isset($_GET["getCountries"])) {
    $command = array_merge($defaultApiParams, [
        'section' => 'countries',
        'command' => 'get',
        'return_type' => 'json'
    ]);
    curl_setopt($ch, CURLOPT_URL, $api . '?' . http_build_query($command));
    echo curl_exec($ch);
}

if (isset($_GET["getPeriods"])) {
    $command = array_merge($defaultApiParams, [
        'section' => 'domains',
        'command' => 'info',
        'return_type' => 'json'
    ]);
    curl_setopt($ch, CURLOPT_URL, $api . '?' . http_build_query($command));
    echo curl_exec($ch);
}

if (isset($_POST["sendData"])) {
    $allowed_keys = [
        'firstname', 'lastname', 'email', 'username', 'address1', 'city', 'zip', 'province',
        'company', 'phone', 'country', 'currency', 'period', 'plan', 'domains',
    ];
    $params = array_intersect_key($_POST, array_flip($allowed_keys));

    $command = array_merge($defaultApiParams, [
        'section' => 'order',
        'command' => 'create',
        'return_type' => 'json',
        'ip' => $_SERVER['REMOTE_ADDR'],
        'payment_method' => 'Trial',
        'return_url' => 'https://tovanqmadaezaeto.com',
        'cancel_url' => 'https://tovanqmadaezaeto.com/shopcart'
    ]);

    curl_setopt($ch, CURLOPT_URL, $api . '?' . http_build_query(array_merge($command, $params)));
    //var_dump($api . '?' . http_build_query($params));
    echo curl_exec($ch);
}