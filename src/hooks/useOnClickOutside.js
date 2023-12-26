//refer class code
//no need of ref or handler inside dependency array ig -> instead used []
import { useEffect } from "react";


export default function useOnClickOutside(ref, handler){
    useEffect(()=>{

        const listener = (e) => {
            if(!ref.current || ref.current.contains(e.target)){
                return
            }

            handler()
            //didn't pass e as an argument
        } 

        document.addEventListener('mousedown', listener)
        document.addEventListener('touchstart', listener)

        
        return () => {
            document.removeEventListener('mousedown', listener)
            document.removeEventListener('touchstart', listener)
        }
    }, [])
    
}