<?php

namespace app\controllers;

use Slim\Http\Request;
use Slim\Http\Response;

/**
 * Class AppController
 * @package app\controllers
 */
class AppController extends Controller {

    public function showHome(Request $request, Response $response, array $args): Response {
        $this->view->render($response, 'pages/home.twig');
        return $response;
    }

}