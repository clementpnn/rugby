// eslint-disable-next-line check-file/folder-naming-convention
"use client";
import Button from "@/components/buttons/button";
import {Input} from "@/components/ui/input";

const Test = () => {
  return (
    <div>
      <Button variant="primary" size="sm" onClick={()=>console.log('yo')
      }>
        Salut
      </Button>
      <Input placeholder="Hey" size="lg"></Input>
    </div>
  );
};

export default Test;
