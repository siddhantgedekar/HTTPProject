import { BiSolidPlusSquare } from "react-icons/bi";
import Button from 'react-bootstrap/Button';
// import { IoIosMoon } from "react-icons/io";
import { Link } from 'react-router-dom';
import { CiSun } from "react-icons/ci";

const Navbar = () => {
    return (
    <div className='col d-flex justify-content-between align-items-center px-3 bg-secondary'>
        <Button style={{fontWeight: 'bold', border: 'none', background: 'transparent'}}>
            <Link to='/' style={{ textDecoration: 'none', background: 'linear-gradient(to right, cyan, blue', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Product Store 🛒</Link>
        </Button>
        <div className=''>
            <Link to='/create'>
                <Button style={{fontWeight: 'bold', border: 'none', background: 'transparent', color: 'black', padding: '4px'}}><BiSolidPlusSquare size={30}/></Button>
            </Link>
            <Link to='/'>
                <Button style={{fontWeight: 'bold', border: 'none', background: 'transparent', color: 'black', padding: '4px'}}><CiSun size={28}/></Button>
            </Link>
        </div>
    </div>
    )
}
export default Navbar