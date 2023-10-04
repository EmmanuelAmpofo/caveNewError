
const WatchCard = ({
    image,
    watchName,
    onSelect,
    watch
}) => {
  const handleSelectedWatch = () => {
    onSelect(watch)
    console.log(watch)
  }
  return (
    <div>
        <div className="flex flex-col justify-center cursor-pointer" onClick={handleSelectedWatch} >
            <img src={image} alt="" className="" />
            <div className="flex justify-center mt-2">
                <p>{watchName}</p>
            </div>
        </div>
    </div>
  )
}

export default WatchCard