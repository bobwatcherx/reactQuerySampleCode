 import {
   useQuery,
   useMutation,
   useQueryClient,
   QueryClient,
   QueryClientProvider,
 } from 'react-query'
 import axios from 'axios'


export default function App(){
  const queryClient = useQueryClient()
 
     const query = useQuery('users', async()=>{
       const {data} = await axios.get("http://localhost:3001/posts")
       return data
     },{
       refetchInterval:1000
       
     })
  const mutation = useMutation(async(newTodo )=> {
     return await axios.post("http://localhost:3001/posts",{
       id:newTodo.id,
       title:newTodo.title,
       author:newTodo.author
     })
         queryClient.prefetchQuery('todos', async()=>{
           const {data} = await axios.get("http://localhost:3001/posts")
       return data
         })
   })
  return(
    <div>home from ReactJS
    {query.isLoading && <h1>Loading....</h1>}
    {query.data && <div>
{query.data.map((p,i)=>(<li>{p.title} = {p.author}</li>))}

      </div>}
    <button
    onClick={()=>{
      mutation.mutate({id:query.data.length+1,title:"bayu",author:"write test"})
    }}>add new data</button>
    </div>)
}

