//  write you CRUD opertaion Here please, this Resource will be reposnsible for interacting with the Property Model
 
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import useSWR from "swr";

export default function useResourceProperty(){
  const apiEndPoint = 'http://127.0.0.1:8000/api/v1/properties/'
  const {tokens} = useContext(AuthContext);
  const {data,err,mutate} = useSWR([apiEndPoint,tokens],fetchResource);

  // Utility Function
  function config(){
    return {
      headers : {
        'Content-Type' : 'Application/json',
        'Authorization' : 'Bearer ' + tokens.access

      }
    }

  
  }

  

  async function fetchResource(){
    if (!tokens){
      return
    }
    try{
      const res = await fetch(apiEndPoint,config())
      const jsonRes = res.json()
      console.log(jsonRes)
      return jsonRes
    } catch(err){
      console.log(`error fetch data, ${err}`)
    }
  }

  async function retrieveResource(id){
    if (!tokens){
      return
    } try{
      const url = `http://127.0.0.1:8000/api/v1/properties/${id}`
      const res = await fetch(url,config())
      const jsonRes = res.json()
      console.log(jsonRes)
      return jsonRes
    } catch(err){
      console.log('error happend during retrieving the data')
    }
  }

  return {
    fetchPropertiesData:data,
    retrievePropertyData: retrieveResource,
    loading: tokens && !err && !data,
    error : err
  }
}