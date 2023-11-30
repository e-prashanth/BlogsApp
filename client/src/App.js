import './App.css';
import { Route, Routes } from "react-router-dom";
import Header from './componets/Header';
import React from 'react';
import Login from './componets/Login';
import Blogs from './componets/Blogs';
import UserBlogs from './componets/UserBlogs'
import AddBlogs from './componets/AddBlogs'
import BlogDetail from './componets/BlogDetail'
import TextToSpeech from './componets/texttospeech';


function App() {
  return <React.Fragment>
    <header>
      <Header/>
    </header>
    <main>
    <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/blogs" element={<Blogs/>}></Route>
      <Route path="/myBlogs" element={<UserBlogs/>}></Route>
      <Route path="/myBlogs/:id" element={<BlogDetail/>}></Route>
      <Route path="/blogs/add" element={<AddBlogs />} />
      <Route path ='/text' element={<TextToSpeech/>}/>
    </Routes>
    </main>

  </React.Fragment>;
}

export default App;
