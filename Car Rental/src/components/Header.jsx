const Header = ({name}) => {
    return(
        <>
        <header className="pb-4 px-20 bg-gray-900 shadow-gray-200">
            <article className="flex justify-between items-center">
            <div className='flex items-center pt-4'>
                <img src="../src/images/car-rental.png" alt="" className='w-16'></img>
                <h1 className="-m-3 text-3xl font-bold font-serif text-white m-4">Car Rental {name}</h1>
            </div>

            <div>
                <h3 className="m-3 text-3xl font-bold font-serif text-white">IsayElla</h3>
            </div>
        </article>
        </header>
        </>

    );
    
}

export default Header;