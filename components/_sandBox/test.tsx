// eslint-disable-next-line check-file/folder-naming-convention
"use client";
import Button from "@/components/buttons/button";

const Test = () => {
  return (
    <div>
      <Button variant="primary" size="sm" onClick={()=>console.log('yo')
      }>
        Salut
      </Button>
    </div>
  );
};

export default Test;
