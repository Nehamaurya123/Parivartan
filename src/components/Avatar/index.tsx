import { FC } from "react";

export const Avatar: FC<any> = ({ first_name, last_name, image }) => {
  return (
    <div className="user-avatar">
      <div className="absolute">
        <div className="avatar-text">
          {first_name != "" ? first_name.charAt(0).toUpperCase() : ""}
          {last_name != "" ? last_name.charAt(0).toUpperCase() : ""}
        </div>
      </div>
      {!image ? (
        ""
      ) : (
        <div className="absolute">
          <div className="avatar-image">
            <img src={image} alt="" onLoad={(e: any)=>{e.target.style.opacity=1}} style={{opacity: 0}} />
          </div>
        </div>
      )}
    </div>
  );
};
