interface Navprops{
  name:string;
}
export default function AgentNav({name}:Navprops){
  return(
    <>
      <div style={{display:"flex",padding:"30px"}}>
        <p style={{textAlign:"right",width:"100%",margin:"0"}}>Hello, <strong>{name}</strong> </p>
      </div>
    </>
  )
}