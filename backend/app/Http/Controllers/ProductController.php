<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
// dd('test');
class ProductController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth:api'])->except(['getProduct','getProductById','addProduct','updateProduct','deleteProduct']);
        // $this->middleware('auth:api', ['only' => ['store','destroy']]);
    }
    public function getProduct(){
        // return true;
         return response()->json(Product::all(), 200);
    }
    public function getProductById($id){
        $product = Product::find($id);
        if(is_null($product)){
            return response() -> json(['message' => 'Product Not Found'],404);
        }
        return response()->json($product::find($id), 200);
    }
    
    public function addProduct(Request $request){
        // if($request -> hasFile('file')){
        //     $file = $request -> file('file');
        //     $fileName = $file -> getClientOriginalName();
        //     $file->storeAs('uploads', $fileName);

        //     $stringData = $request ->input('stringData');
        //     return response() ->json([
        //         'success' => true,
        //         'message' => 'file uploaded successfully'
        //     ],201);
        // }
        // else{
        //     return response()->json([
        //         'success' => false,
        //         'message' => 'no file selected'
        //     ], 400);
        //}
        $product = Product::create($request ->all());
        return response($product,201);
    }
    public function updateProduct(Request $request, $id){
        $product = Product::find($id);
        if(is_null($product)){
            return response() -> json(['message' => 'Product Not Found'],404);
        }
        $product -> update($request->all());
        return response($product,201);
    }
    public function deleteProduct(Request $request, $id){
        $product = Product::find($id);
        if(is_null($product)){
            return response() -> json(['message' => 'Product Not Found'],404);
        }
        $product -> delete();
        return response() -> json(null, 204);
    }
}
