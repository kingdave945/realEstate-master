import  { type ICustomInput } from './Utility/index';

const CustomInput = function ({
  label,
  name,
  option,
  handleChange,
  value,
}: ICustomInput) {
  return (
    <div className=" my-2 flex flex-col ">
      <label className=" my-1 font-semibold">{label}</label>
      <select
        name={name}
        id=""
        className=" text-sm "
        onChange={handleChange}
        value={value}
      >
        {Array.isArray(option) &&
          typeof option[0] == "string" &&
          option.map((val, idx) => {
            return (
              <option
                className=" bg-[#] outline-none hover:bg-purple "
                value={val}
                key={idx}
              >
                {val}
              </option>
            );
          })}
      </select>
    </div>
  );
};

export default CustomInput;
