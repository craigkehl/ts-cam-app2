import classes from './Card.module.css';

type CardProps = { 
  className?: string,
  children: React.ReactNode
 }

const Card: React.FC<CardProps> = (props) => {
  const propsClassName = props.className || ''
  
  return (
    <div className={`${classes.card} ${classes[propsClassName]}`}>{props.children}</div>

  );
};

export default Card;
