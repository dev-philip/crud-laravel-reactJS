<?php

namespace App\Http\Controllers\Api;

use App\Models\booksrecord;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;

class BookController extends Controller
{
    public function getListOfBooks(){

        $getRecord = DB::table('booksrecords')->orderBy('id','DESC')->get(); 
        return response()->json($getRecord);
    }

    public function saveABook(Request $request){
        $bookrecord = new booksrecord;

        $bookrecord->book_name = $request->bookNameValue;
        $bookrecord->book_author = $request->bookAuthorValue;
        $bookrecord->quantity = $request->bookQuantityValue;
        $bookrecord->book_price = $request->bookPriceValue;
        $bookrecord->save();

            return response()->json([
                'status' => true,
                'message' => 'Book Inserted Successfully'
            ]);

    }

    public function deleteABook($id){
        DB::table('booksrecords')->where('id', $id)->delete();
    }

    public function getOneBook($id){
       $getBookData =  DB::table('booksrecords')->where('id', $id)->get();
       return response()->json($getBookData);
    }

    public function updateABook(Request $request, $id){

        $data = array();
        $data['book_name'] = $request->bookNameValue;
        $data['book_author'] = $request->bookAuthorValue;
        $data['quantity'] = $request->bookQuantityValue;
        $data['book_price'] = $request->bookPriceValue;
        
       $query =  DB::table('booksrecords')->where('id',$id)->update($data);
            return response()->json([
                'status' => true,
                'message' => 'Book Updated Successfully'
            ]);
    }
}
