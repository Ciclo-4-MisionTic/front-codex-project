import React, { useState, useEffect } from 'react';
import PrivateLayout from 'layouts/PrivateLayout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserContext } from 'context/userContext';
import { ApolloProvider, ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context';
import Index from 'pages/Index';
import IndexUsuarios from 'pages/usuarios';
import EditarUsuario from 'pages/usuarios/editar';
import Profile from './pages/perfil';
import AuthLayout from 'layouts/AuthLayout';
import Register from 'pages/auth/register';
import Login from 'pages/auth/login';
import { AuthContext } from 'context/authContext';
import jwt_decode from 'jwt-decode';
import IndexProyectos from 'pages/proyectos/Index';
import IndexAvance from 'pages/avances';
import NuevoProyecto from 'pages/proyectos/NuevoProyecto';
import VerUsuario from 'pages/usuarios/verUsuario';
import IndexInscripciones from 'pages/inscripciones/inscripciones';
import EditarProfile from './pages/editarPerfil';
import 'styles/globals.css';
import 'styles/tabla.css'

// import PrivateRoute from 'components/PrivateRoute';

// const httpLink = createHttpLink({
//   uri: "https://codex-project1.herokuapp.com/graphql",
// });

const httpLink = createHttpLink({
 uri: "http://localhost:4000/graphql",
});


const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = JSON.parse(localStorage.getItem('token'));
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});


const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
}) 

function App() {
  const [userData, setUserData] = useState({});
  const [authToken, setAuthToken] = useState ('');

  const setToken = (token) =>{
    console.log('set token', token);
    setAuthToken(token)
    if(token){
      localStorage.setItem('token', JSON.stringify(token));
    }else{
      localStorage.removeItem('token');
    }
  };

  useEffect(() => {
    if (authToken){
      const decode = jwt_decode(authToken);
      console.log("decode",decode);
      setUserData({
        _id: decode._id,
        nombre: decode.nombre,
        apellido: decode.apellido,
        identificacion: decode.identificacion,
        correo : decode.correo,
        rol: decode.rol,
        foto: decode.foto,
      })
    }
  },[authToken]);

  return (
    <ApolloProvider client = {client}>
      <AuthContext.Provider value={{authToken, setAuthToken , setToken}}>
        <UserContext.Provider value={{ userData, setUserData }}>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<PrivateLayout />}>
                <Route path='' element={<Index />} />
                <Route path='/usuarios' element={<IndexUsuarios />} />
                <Route path='/usuarios/editar/:_id' element={<EditarUsuario />} />
                <Route path='/usuarios/verUsuario/:_id' element={<VerUsuario />} />
                <Route path='/perfil' element={<Profile />} />
                <Route path='/perfil/editarperfil/' element={<EditarProfile />} />
                <Route path='proyectos' element={<IndexProyectos />} />
                <Route path='proyectos/nuevo' element={<NuevoProyecto />} />
                <Route path='/inscripciones' element={<IndexInscripciones />} />
                <Route path='/avances/:projectid' element={<IndexAvance />} />
              </Route>
              <Route path= "/auth" element={<AuthLayout/>} >
                <Route path='register' element={<Register/>}/>
                <Route path='login' element={<Login />}/>
              </Route>
            </Routes>
          </BrowserRouter>
        </UserContext.Provider>
      </AuthContext.Provider>

    </ApolloProvider>
  );
}

export default App;