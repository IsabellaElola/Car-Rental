const list = ({Namelist}) => {
    return (
        <>
        <ul>
            {Namelist && Namelist.map((Headername, index) =>
                <li key= {index}>{Headername}</li>
            )}
        </ul>
        </>
)}

export default list