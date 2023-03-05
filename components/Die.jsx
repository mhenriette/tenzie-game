
const Die = ({value, className, id, holdDice}) => {
  return <div className={`die-face bg-red-500 ${className}`} onClick={holdDice}>
  <h2 className='die-num'>{value}</h2>
</div>;
}

export default Die;
