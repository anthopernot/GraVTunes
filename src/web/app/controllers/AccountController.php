<?php

namespace app\controllers;

use Slim\Http\Request;
use Slim\Http\Response;

class AccountController extends Controller {

    public function showAccount(Request $request, Response $response, array $args): Response {
        $this->view->render($response, 'pages/account.twig');
        return $response;
    }



}