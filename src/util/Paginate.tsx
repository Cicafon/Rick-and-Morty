import classes from "./Paginate.module.css";

const Paginate: React.FC<{
  picPerPage: number;
  totalPics: number;
  currentPage: number;
  paginateing: (number: number) => void;
}> = (props) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(props.totalPics / props.picPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className={classes.nav}>
      <ul>
        {pageNumbers.map((number) => (
          <li
            key={number}
            onClick={() => props.paginateing(number)}
            className={props.currentPage === number ? classes.active : ""}
          >
            {number}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Paginate;
