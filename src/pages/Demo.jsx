import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer"; 
import { Contact } from "./Contact";


export const Demo = () => {

  const { store, dispatch } = useGlobalReducer()
console.log("Store data:", store);

  return (
    <>
    <div className="container">
      <ul className="list-group">
        {store && store.contacts?.map((item) => (
          <li
            key={item.id}  
            className="list-group-item d-flex justify-content-between"
            style={{ background: item.background }}
          > 

            <Link to={"/single/" + item.id}>Link to: {item.name}</Link>
            
            <p>{item.name}</p>
            
            <button
              className="btn btn-success" 
              onClick={() => dispatch({
                type: "add_task", 
                payload: { id: item.id, color: '#ffa500' }
              })}
            >
              Change Color
            </button>
          </li>
        ))}
      </ul>
      <br />

      <Link to="/">
        <button className="btn btn-primary">Back home</button>
      </Link>
    </div>
    </>
  );
};