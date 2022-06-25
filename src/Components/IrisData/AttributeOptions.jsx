import React from "react";

export default function AttributeOptions(props){

    const {name, value, options, handleChange, text} = props
    
    return (
      <div class="mb-b ml-3 mt-5">
        <label class="form-label">{text}</label>
        <select
          class="form-select w-100"
          name={name}
          value={value}
          onChange={handleChange}
        >
          <option value="">Chose attribute</option>
          {options.map((option) => {
            return <option value={option}>{option}</option>;
          })}
        </select>
      </div>
    );
}