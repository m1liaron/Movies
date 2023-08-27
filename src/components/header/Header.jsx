import { NavLink } from "react-router-dom";

const Header = () => {
    const headerLink = {
        height: '35px',
        fontSize: '25px',
        textDecoration: 'none',
        borderBottom: '2px solid #D30D18'
    }

    return (
        <div style={{ width: '100%', height: '50px', display: 'flex',justifyContent:'end', gap:'20px'}}>
            <NavLink style={({ isActive}) => ({...headerLink, color: isActive ? '#D30D18 ' : '#000000', borderBottom: isActive ? '2px solid #D30D18' : 'none'})} to='/'>Дiм</NavLink>
            <NavLink style={({ isActive}) => ({...headerLink, color: isActive ? '#D30D18' : '#000000', borderBottom: isActive ? '2px solid #D30D18' : 'none'})} to='/serials'>Серіали</NavLink>
        </div>
    )
}

export default Header;