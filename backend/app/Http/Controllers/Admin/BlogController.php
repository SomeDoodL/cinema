<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Blog;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;

class BlogController extends Controller
{
    /**
     * Show all blogs (public)
     */
    public function index()
    {
        $blogs = Blog::latest()->get();

        return response()->json([
            'blogs' => $blogs
        ]);
    }

    /**
     * Show a single blog by ID (public)
     */
    public function show($id)
    {
        $blog = Blog::findOrFail($id);

        return response()->json([
            'blog' => $blog
        ]);
    }

    /**
     * Admin: Create a new blog post (with optional image)
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('blog_images', 'public');
        }

        $blog = Blog::create([
            'title' => $validated['title'],
            'content' => $validated['content'],
            'image_path' => $imagePath,
            'user_id' => Auth::id(),
        ]);

        return response()->json([
            'message' => 'Blog created successfully!',
            'blog' => $blog,
        ]);
    }

    /**
     * Admin: View all blogs for management
     */
    public function adminIndex()
    {
        $blogs = Blog::latest()->get();

        return response()->json([
            'blogs' => $blogs
        ]);
    }
}
