import { FC } from "react";
import "../../assets/scss/paginate.scss";

const Paginate: FC<any> = ({ count, perpage, current, onClick }) => {
  let previous_btn = true;
  let next_btn = true;
  let first_btn = true;
  let last_btn = true;
  let start_loop = 0;
  let end_loop = 0;
  let no_of_paginations = Math.ceil(count / perpage);
  if (current >= 7) {
    start_loop = current - 3;
    if (no_of_paginations > current + 3) end_loop = current + 3;
    else if (current <= no_of_paginations && current > no_of_paginations - 6) {
      start_loop = no_of_paginations - 6;
      end_loop = no_of_paginations;
    } else {
      end_loop = no_of_paginations;
    }
  } else {
    start_loop = 1;
    if (no_of_paginations > 7) end_loop = 7;
    else end_loop = no_of_paginations;
  }
  let btn = Array.apply(null, new Array(end_loop + 1 - start_loop));

  return (
    <div>
      {count > 0 ? (
        <div>
          <div className="pr-page-con">
            <div className="pr-page-summary">
              <div style={{ marginTop: "10px" }}>
                Page <strong>{current}</strong> of{" "}
                <strong>{no_of_paginations}</strong> Pages{" "}
                <span>
                  Total Records <strong>{count}</strong>
                </span>
              </div>
            </div>
            <div className="pr-page-action">
              <ul className="pr-pagination">
                {first_btn && current > 1 ? (
                  <li onClick={onClick.bind(this, 1)} className="active">
                    <span>First</span>
                  </li>
                ) : first_btn ? (
                  <li className="inactive">
                    <span>First</span>
                  </li>
                ) : (
                  ""
                )}
                {previous_btn && current > 1 ? (
                  <li
                    onClick={onClick.bind(this, current - 1)}
                    className="active"
                  >
                    <span>Prev</span>
                  </li>
                ) : first_btn ? (
                  <li className="inactive">
                    <span>Prev</span>
                  </li>
                ) : (
                  ""
                )}
                {btn.map((x, n) => {
                  let i = start_loop + n;
                  if (current == i)
                    return (
                      <li className="inactive cpageval">
                        <span>{i}</span>
                      </li>
                    );
                  else
                    return (
                      <li onClick={onClick.bind(this, i)} className="active">
                        <span>{i}</span>
                      </li>
                    );
                })}
                {next_btn && current < no_of_paginations ? (
                  <li
                    onClick={onClick.bind(this, current + 1)}
                    className="active"
                  >
                    <span>Next</span>
                  </li>
                ) : next_btn ? (
                  <li className="inactive">
                    <span>Next</span>
                  </li>
                ) : (
                  ""
                )}
                {last_btn && current < no_of_paginations ? (
                  <li
                    onClick={onClick.bind(this, no_of_paginations)}
                    className="active"
                  >
                    <span>Last</span>
                  </li>
                ) : last_btn ? (
                  <li className="inactive">
                    <span>Last</span>
                  </li>
                ) : (
                  ""
                )}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Paginate;
