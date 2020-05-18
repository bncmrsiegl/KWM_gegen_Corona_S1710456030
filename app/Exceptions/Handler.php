<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Report or log an exception.
     *
     * @param  \Exception  $exception
     * @return void
     */
    public function report(Exception $exception)
    {
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Exception  $exception
     * @return \Illuminate\Http\Response
     */
    public function render($request, Exception $exception) {

        //if the request wants JSON
        if($request->wantsJson()){

            //define the response
            $response = [
                'errors' => 'Sorry, something went wrong.'
            ];

            //if the app is in debug mode
            if(config('app.debug')){

                //add the exception class name, message and stack trace to response
                $response['exception'] = get_class($exception);
                $response['message'] = $exception->getMessage();
                $response['trace'] = $exception->getTrace();
            }

            //default response of 400
            $status = 400;

            //if this exception is an instance of HttpException
            if($exception instanceof HttpException){

                //grab the HTTP status code from the Exception
                $status = $exception->getStatusCode();
            }

            //return a JSON response with the response array and status code
            return response()->json($response, $status);
        }

        //default to the parent class' implementation of handler
        return parent::render($request, $exception);
    }
}
