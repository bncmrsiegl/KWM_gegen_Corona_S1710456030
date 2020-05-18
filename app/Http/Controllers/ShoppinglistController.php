<?php

namespace App\Http\Controllers;

use App\Feedback;
use App\ShoppingList;
use App\Item;
use App\User;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Database\Eloquent;
use Illuminate\Support\Facades\DB;

class ShoppinglistController extends Controller {

    public function index() {
        //load all lists and relations with eager loading (load all related objects)
        $lists = ShoppingList::with(['creator', 'helper', 'items', 'feedbacks'])->get();
        return $lists;
    }

    public function findByID(int $id) : ShoppingList {
        $list = ShoppingList::where('id', $id)
            ->with(['creator', 'helper', 'items', 'feedbacks'])
            ->first();

        return $list;
    }

    public function findUserByID(int $id) : User {
        $user = User::where('id', $id)->first();
        return $user;
    }

    public function checkID(int $id) {
        $list = ShoppingList::where('id', $id)->first();
        return $list != null ? response()->json('list with '. $id . ' exists', 200) :
            response()->json('list with '. $id . ' does not exist', 404);
    }

    public function save(Request $request) : JsonResponse {
        $request = $this->parseRequest($request);
        DB::beginTransaction();
        try {
            $list = ShoppingList::create($request->all());
            if (isset($request['items']) && is_array($request['items'])) {
                foreach ($request['items'] as $item) {
                    $item = Item::firstOrNew(['description'=>$item['description'],
                        'quantity'=>$item['quantity'], 'max_price'=>$item['max_price']]);
                    $list->items()->save($item);
                }
            }
            DB::commit();
            //return a valid http response
            return response()->json($list, 201);
        }
        catch (\Exception $e){
            //rollback all queries
            DB::rollBack();
            return response()->json("saving list failed: " . $e->getMessage(), 420);
        }
    }

    public function parseRequest(Request $request) : Request {
        //get date and convert it - its in ISO 8601, e.g. "2020-04-25T10:00:00.000Z"
        $date = new \DateTime($request->published);
        $request['published'] = $date;
        return $request;
    }

    public function update(Request $request, int $id) : JsonResponse {

        DB::beginTransaction();
        try {
            $list = ShoppingList::with(['creator', 'helper', 'items', 'feedbacks'])
                ->where('id', $id)->first();

            if($list != null) {
                $request = $this->parseRequest($request);
                $list->update($request->all());

                //delete all old items
                $list->items()->delete();

                //save items
                if(isset($request['items']) && is_array($request['items'])) {
                    foreach ($request['items'] as $item) {
                        $newitem = Item::firstOrNew(['description'=>$item['description'],
                            'quantity'=>$item['quantity'], 'max_price'=>$item['max_price']]);
                        $list->items()->save($newitem);
                    }
                }
            }
            DB::commit();
            $newlist = ShoppingList::with(['creator', 'helper', 'items', 'feedbacks'])
                ->where('id', $id)->first();
            //return a valid http response
            return response()->json($newlist, 201);
        }
        catch (\Exception $e) {
            //rollback all queries
            DB::rollBack();
            return response()->json("updating list failed: " . $e->getMessage(), 420);
        }
    }

    public function delete(int $id) : JsonResponse {
        $list = ShoppingList::where('id', $id)->first();
        if($list != null) {
          $list->delete();
        }
        else throw new \Exception("list could not be deleted - it does not exist");
        return response()->json('list with id ' . $id . " successfully deleted", 200);
    }

    public function show(ShoppingList $list) {
        return view ('lists.show', compact('list'));
    }

    public function addFeedback(Request $request, int $id) : JsonResponse {
        $request = $this->parseRequest($request);
        DB::beginTransaction();

        try {
            $list = ShoppingList::with(['creator', 'helper', 'items', 'feedbacks'])
                ->where('id', $id)->first();
            if($list != null){
                $feedback = Feedback::firstOrNew(['text' => $request['text'], 'writer_id' => $request['writer_id']]);
                $list->feedbacks()->save($feedback);
                $list->save();
            }
            DB::commit();
            return response()->json('comment with id ' . $feedback . " successfully added", 200);
        }
        catch (\Exception $e) {
            //rollback all queries
            DB::rollBack();
            return response()->json("updating list failed: " . $e->getMessage(), 420);
        }
    }
}
