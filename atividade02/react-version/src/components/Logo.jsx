const Logo = () => {
  return (
    <div className="logo">
      <svg 
        width="60" 
        height="60" 
        viewBox="0 0 60 60" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect 
          x="5" 
          y="5" 
          width="50" 
          height="50" 
          stroke="black" 
          strokeWidth="2" 
          fill="white"
        />
        <rect 
          x="15" 
          y="15" 
          width="30" 
          height="20" 
          stroke="black" 
          strokeWidth="2" 
          fill="none"
        />
        <line 
          x1="30" 
          y1="15" 
          x2="30" 
          y2="35" 
          stroke="black" 
          strokeWidth="2"
        />
        <line 
          x1="15" 
          y1="25" 
          x2="45" 
          y2="25" 
          stroke="black" 
          strokeWidth="2"
        />
        <rect 
          x="20" 
          y="40" 
          width="20" 
          height="10" 
          stroke="black" 
          strokeWidth="2" 
          fill="none"
        />
      </svg>
    </div>
  );
};

export default Logo;