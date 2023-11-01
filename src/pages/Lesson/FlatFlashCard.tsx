import IconSvg from "../../components/IconSvg";

const FlatFlashCard = () => {
  return (
    <div className="flex flex-row my-6">
      <div className="flex flex-row gap-2">
        <p className="flex-1 px-3">
          31) Cái riêng là một phạm trù dùng để chỉ... a) Những mặt, những thuộc
          tính chung của nhiều sự vật b) Một sự vật, một hiện tượng, một quá
          trình riêng lẻ nhất định c) Những nét, những thuộc tính chỉ có ở một
          sự vật d) Các yếu tố cấu thành một hệ thống
        </p>
        <p className="flex-1 px-3">sadfasfafsadf</p>
      </div>
      <div className="flex flex-row gap-2 h-[25px]">
        <button className="w-9 h-9 rounded-[50%] hover:bg-[#edeff4] transition duration-300 ease-in-out">
          <IconSvg iconName="star-filled " />
        </button>
        <button className="w-9 h-9 rounded-[50%] hover:bg-[#edeff4] transition duration-300 ease-in-out">
          <IconSvg iconName="edit" />
        </button>
      </div>
    </div>
  );
};

export default FlatFlashCard;
