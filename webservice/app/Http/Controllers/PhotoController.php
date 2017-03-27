<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class PhotoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $tasks = DB::table('photos')->get();
        return response()->json($tasks);
    }

    public function validateUser(Request $request){
      $username = $request->input('username');
      $password = md5($request->input('password'));
      $users = DB::table('users')
                    ->where('username', $username)
                    ->where('password', $password)
                    ->get();
      if(count($users)==0){
        return response()->json(0);
      }else{
        return response()->json(1);
      }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
      $request->file('file')->store('uploads');
      $imagename = $request->file->hashName();



      return back()->with('success','Image Upload successful');


        // $name = $request->input('name');
        // $reason = $request->input('reason');
        // DB::table('leaves')->insert(
        //   ['name' => $name, 'reason' => $reason]
        // );
        // dd($_POST);
        // return response()->json(1);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
      // echo $id;
        $task = DB::table('tasks')->where('id', $id)->first();
        return response()->json($task);
        // return $task;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
