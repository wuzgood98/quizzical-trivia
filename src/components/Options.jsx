import React from 'react'
import { useGlobalContext } from '../context/AppContext'
import { triviaOptions } from '../utils/triviaOptions'

const Options = () => {
  const {
    state,
    startQuiz,
    handleNumberChange,
    openDifficulty,
    openType,
    openCategory,
    handleCategory,
    handleDifficulty,
    hideDropDownMenu,
    handleType } = useGlobalContext()


  return (
    <form onSubmit={startQuiz} className='animate-fadeIn font-karla flex flex-col gap-5 w-full max-w-xl mx-auto min-h-[40rem] items-center justify-center'>

      {/* number of questions */}
      <div className="flex flex-col w-full gap-2">
        <label htmlFor="trivia_amount">Number of Questions: </label>
        <input
          onFocus={hideDropDownMenu}
          type="number"
          name="trivia_amount"
          onChange={handleNumberChange}
          id='trivia_amount'
          min={1}
          max={50}
          aria-label='Number of Questions'
          value={state.amount}
          className='font-inter text-sm w-full p-3 outline-none border border-gray-300 rounded-lg sm:text-base'
        />
      </div>

      {/* category */}
      <div className="flex flex-col w-full gap-2">
        <label htmlFor="trivia_category">Select Category: </label>
        <div className='relative w-full'>
          <div onClick={openCategory} className="relative w-full cursor-pointer">
            <p aria-label='Select Category' className='font-inter text-sm select-none capitalize w-full p-3 rounded-lg bg-white border border-gray-300 sm:text-base'>
              {state.categoryText === "any" ? "any category" : state.categoryText}
            </p>
            <div className="h-4 w-4 absolute right-3 top-0 bottom-0 my-auto">
              <svg className={`${state.categoryOpen ? "rotate-180 fill-gray-600" : "rotate-0 fill-gray-400"} transition-all duration-300 ease-in-out`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
              </svg>

            </div>
          </div>
          <div id='options' className={`${state.categoryOpen ? "visible opacity-100 translate-y-0 z-10" : "invisible opacity-0 -translate-y-3 -z-10 max-h-0"} absolute left-0 top-[3.3rem] w-full rounded-lg shadow-md bg-white flex flex-col max-h-36 overflow-y-auto transition-all`}>
            {
              triviaOptions.categories.map((category) => {
                const { value, type, id } = category
                return (
                  <p key={id} aria-label={type} onClick={() => handleCategory(value, type)} className='font-inter text-sm px-4 py-2 capitalize w-full hover:bg-gray-100 cursor-pointer transition-colors sm:text-base'>{type}</p>
                )
              })
            }
          </div>
        </div>
      </div>

      {/* difficulty */}
      <div className="flex flex-col w-full gap-2">
        <label htmlFor="trivia_difficulty">Select Difficulty: </label>
        <div className='relative w-full'>
          <div onClick={openDifficulty} className="relative w-full cursor-pointer">
            <p aria-label='Select Difficulty' className='font-inter text-sm select-none capitalize w-full p-3 rounded-lg bg-white border border-gray-300 sm:text-base'>
              {state.difficultyText === "any" ? "any difficulty" : state.difficultyText}
            </p>
            <div className="h-4 w-4 absolute right-3 top-0 bottom-0 my-auto">
              <svg className={`${state.difficultyOpen ? "rotate-180 fill-gray-600" : "rotate-0 fill-gray-400"} transition-all duration-300 ease-in-out`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
              </svg>

            </div>
          </div>
          <div id='options' className={`${state.difficultyOpen ? "visible opacity-100 translate-y-0 z-10" : "invisible opacity-0 -translate-y-3 -z-10"} absolute left-0 top-[3.3rem] w-full rounded-lg shadow-md bg-white flex flex-col max-h-36 overflow-y-auto transition-all`}>
            {
              triviaOptions.difficulties.map((difficulty) => {
                const { value, id } = difficulty
                return (
                  <p key={id} aria-label={value} onClick={() => handleDifficulty(value)} className='font-inter text-sm px-4 py-2 capitalize w-full hover:bg-gray-100 cursor-pointer transition-colors sm:text-base'>{value === "any" ? "any difficulty" : value}</p>
                )
              })
            }
          </div>
        </div>
      </div>

      {/* type */}
      <div className="flex flex-col w-full gap-2">
        <label htmlFor="trivia_type">Select Type: </label>
        <div className='relative w-full'>
          <div onClick={openType} className="relative w-full cursor-pointer">
            <p aria-label='Select Type' className='font-inter text-sm select-none capitalize w-full p-3 rounded-lg bg-white border border-gray-300 sm:text-base'>
              {state.typeText === "any" ? "any type" : state.typeText}
            </p>
            <div className="h-4 w-4 absolute right-3 top-0 bottom-0 my-auto">
              <svg className={`${state.typeOpen ? "rotate-180 fill-gray-600" : "rotate-0 fill-gray-400"} transition-all duration-300 ease-in-out`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
              </svg>

            </div>
          </div>
          <div id='options' className={`${state.typeOpen ? "visible opacity-100 translate-y-0 z-10" : "invisible opacity-0 -translate-y-3 -z-10"} absolute left-0 top-[3.3rem] w-full rounded-lg shadow-md bg-white flex flex-col max-h-36 overflow-y-auto transition-all`}>
            {
              triviaOptions.types.map((typeData) => {
                const { value, id, type } = typeData
                return (
                  <p key={id} aria-label={type} onClick={() => handleType(value, type)} className='font-inter text-sm px-4 py-2 capitalize w-full hover:bg-gray-100 cursor-pointer transition-colors sm:text-base'>{type}</p>
                )
              })
            }
          </div>
        </div>
      </div>

      <button className="self-center bg-blue200 text-center mt-5 rounded-xl capitalize text-white100 w-full max-w-[10rem] py-3 font-inter text-sm font-semibold tracking-wide transition-transform active:scale-95 sm:text-base">start quiz</button>
    </form>
  )
}

export default Options