
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full border-t border-[#e0e8e1] bg-[#fbfdfb] py-3 ">
      <div className="mx-auto flex min-h-10 max-w-5xl flex-col items-center justify-between gap-2 px-4 py-3 sm:flex-row sm:px-6">
        <p className="text-center text-[16px] text-[#68736b] sm:text-left">
          বাজার দর — প্রতিদিনের পণ্যের দাম এক নজরে।
        </p>

        <p className="text-center text-[16px] text-[#68736b] sm:text-right">
          সঠিক বাজার তথ্য, বাজার বুঝুন এবং নিজের হিসাব রাখুন।
        </p>
      </div>
    </footer>
  );
};

export default Footer;
