import React, {useState ,useEffect} from 'react'
import { useNavigate ,useLocation } from 'react-router-dom'
import { Image } from 'react-bootstrap'
const Spinner = ({path = "login"}) => {
    const [count,setCount] = useState(5)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((currentCount) => --currentCount)
        }, 1000)
        count === 0 && navigate(`${path}` ,{
            state : location.pathname
        })
        return () => clearInterval(interval)
    }, [count,navigate,location,path])
  return (
    <>
   <div class="text-center justify-content-center align-items-center">
  <div class="spinner-border" role="status">

    <span class="visually-hidden">Loading...</span>
  </div>
    <h1 className='text-center'>Redirecting you in {count} seconds</h1>
</div>
 <div className="d-flex justify-content-center p-10">
            <Image
                src="/images/depositphotos_13121704-stock-photo-hello-goodbye-high-five-dog.jpg"
                style={{ width: '25%' }}
                className="mx-auto"
                fluid
            />
        </div>


    </>
  )
}

export default Spinner