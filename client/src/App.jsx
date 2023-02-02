import {ApolloProvider,ApolloClient,InMemoryCache} from "@apollo/client"

import Header from "./components/Header"


const client = new ApolloClient({
  uri: "http://localhost:3000",
  
})

function App() {

  return (
    <>
      <Header />
      <h1>Hello</h1>
    </>
   
  )
}

export default App
