import React, {
  useState,
  useEffect,
  useReducer,
  useCallback,
  memo,
} from 'react'
const initialState = { count: 0, count1: 20 }
const init = function ({ count }) {
  return { count, count1: 20 }
}
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + 1 }
    case 'decrement':
      return { ...state, count: state.count - 1 }
    case 'reset':
      return init(action.payload)
    default:
      throw new Error()
  }
}
function useCount() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    console.log(`you clicked ${count}`)
    return () => {
      console.log('destory component')
    }
  })
  const [isOnline, setIsOnline] = useState(null)
  useEffect(() => {
    console.log(`isOnline${isOnline}`)
    return () => {
      console.log('isonline6666')
    }
  }, [isOnline])
  const [studyPropery, setStudyPropery] = useState([{ name: '张三', age: 26 }])
  useEffect(() => {
    console.log(1, studyPropery)
    return () => {
      console.log(666, studyPropery)
    }
  }, [])
  return {
    count,
    setCount,
    isOnline,
    setIsOnline,
    studyPropery,
    setStudyPropery,
  }
}

function MyUseBackAndUse() {
  const [value, setValue] = useState(123)
  const [otherValue, setOtherValue] = useState(999)

  const changeValue = useCallback(() => {
    setValue((value) => value + 1)
  }, [])

  console.log('APP')

  return (
    <div>
      <div>与Message渲染无关的数据==={otherValue}</div>
      <br />
      <button onClick={() => setOtherValue((value) => (value -= 5))}>
        改变无关的数据
      </button>
      <br />
      <br />
      <Message value={value} changeValue={changeValue} />
    </div>
  )
}

const Message = memo(function Message({ value, changeValue }) {
  console.log('Message')

  return (
    <div>
      <button onClick={changeValue}>改变有关数据</button>
      <p>与Message渲染有关的数据{value}</p>
    </div>
  )
})
function CounterReducer() {
  const initialState1 = { ...initialState }
  const [state, dispatch] = useReducer(reducer, initialState1, init)
  console.log(state)
  return (
    <>
      <p>counterReducerValue:{state.count}</p>
      <button
        onClick={() => {
          dispatch({ type: 'reset', payload: { count: 0, count1: 20 } })
        }}
      >
        RESET
      </button>
      <button
        onClick={() => {
          dispatch({ type: 'decrement' })
        }}
      >
        -
      </button>
      <button
        onClick={() => {
          dispatch({ type: 'increment' })
        }}
      >
        +
      </button>
    </>
  )
}
export default function BaseHook() {
  return (
    <div>
      <BaseHookBtn1 />
      <BaseHookBtn2 />
    </div>
  )
}

function BaseHookBtn1() {
  const {
    count,
    setCount,
    isOnline,
    setIsOnline,
    studyPropery,
    setStudyPropery,
  } = useCount()
  function setStudyBtn() {
    const arr = studyPropery.map((items) => {
      return { ...items, age: 36 }
    })
    setStudyPropery((arg) => {
      console.log(arg, 'arg')
      return arr
    })
  }
  return (
    <div>
      <div>BaseHook</div>
      <MyUseBackAndUse></MyUseBackAndUse>
      <CounterReducer></CounterReducer>
      <p>You clicked {count} times</p>
      <p>
        studys==={`name:${studyPropery[0].name}-age:${studyPropery[0].age}`}
      </p>
      <p>{isOnline}</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
      <button onClick={() => setIsOnline(!isOnline)}>isOnline</button>
      <button onClick={setStudyBtn}>6666</button>
    </div>
  )
}
function BaseHookBtn2() {
  const { count, setCount } = useCount()

  return (
    <div>
      <div>BaseHook</div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  )
}
