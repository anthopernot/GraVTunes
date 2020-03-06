<?php

namespace app\controllers;

use app\helpers\Auth;
use Braintree_ClientToken;
use Slim\Http\Request;
use Slim\Http\Response;

/**
 * Class AppController
 * @package app\controllers
 */
class AppController extends Controller {

    public function showHome(Request $request, Response $response, array $args): Response {
        if(Auth::check()) {
            $response = $response->withRedirect($this->router->pathFor('appHome'));
        } else {
            $response = $response->withRedirect($this->router->pathFor('login'));
        }
        return $response;
    }

    public function showDashHome(Request $request, Response $response, array $args): Response {
        $stats = [
            "tracks" => Auth::user()->tracks->count(),
            "orders" => Auth::user()->commandes->count(),
            "tickets" => Auth::user()->tickets->count()
        ];
        $this->view->render($response, 'pages/home.twig', [
            "stats" => $stats,
        ]);
        return $response;
    }

    public function btToken(Request $request, Response $response, array $args): Response {
        return $response->withJson([
            'token' => Braintree_ClientToken::generate()
        ]);
    }
}