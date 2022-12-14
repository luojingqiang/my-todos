# state使用注意点
1.不能直接修改state，必须通过setSate来修改state;
```javaScript
// Wrong(错误的)
this.state.comment = 'Hello';
// 对的
this.setState({comment: 'Hello'});
```
2.State 的更新可能是异步的

- 出于性能考虑，react会把多个setState合并成一个调用;
- 因为 this.props 和 this.state 可能会异步更新，所以你不要依赖他们的值来更新下一个状态。
```javaScript
// Wrong
    this.setState({
    counter: this.state.counter + this.props.increment,
    });
// Correct(推荐的)
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));
```
3.State 的更新会被合并
- 当你调用 setState() 的时候，React 会把你提供的对象合并到当前的 state。
```javaScript
constructor(props) {
    super(props);
    this.state = {
      posts: [],
      comments: []
    };
  }
   componentDidMount() {
    fetchPosts().then(response => {
      this.setState({
        posts: response.posts
      });
    });

    fetchComments().then(response => {
      this.setState({
        comments: response.comments
      });
    });
  }
  //这里的合并是浅合并，所以 this.setState({comments}) 完整保留了 this.state.posts， 但是完全替换了 this.state.comments。
```
4.数据是向下流动的;
# 事件处理
```javaScript
//使用bind绑定
this.handleClick = this.handleClick.bind(this);
//箭头函数的方式
handleClick = () => {
    console.log('this is:', this);
  };
// 回调函数中使用
class LoggingButton extends React.Component {
  handleClick() {
    console.log('this is:', this);
  }

  render() {
    // 此语法确保 `handleClick` 内的 `this` 已被绑定。
    return (
      <button onClick={() => this.handleClick()}>
        Click me
      </button>
    );
  }
}
//每次创建LoggingButton组件是都会创建一个新的回调函数，一般是没有问题的，但是把回调函数当作props传递时，这些组件可能会进行额外的重新渲染
```
# hooks学习笔记
1.先说一下react
 - react是基于数据是不可变的（每次setState都会返回一个新数据），这也是为什么需要setState()来更新数据而不能使用像vue的this.state = newState的形式更新数据的原因，其实你用this.state=newState确实可以改数据，但是react不知道数据变了。

 2.useMemo、useEffect的执行时机对比
 - useMemo和useCallback都会在组件第一次渲染的时候执行，之后会在其依赖的变量发生改变时再次执行；并且这两个hooks都返回缓存的值，useMemo返回缓存的变量，useCallback返回缓存的函数

 3.useMemo的使用场景
 - 使用过vue的话，你可以把它理解成vue里面的computed，是一种数据的缓存，而这个缓存依赖后面的第二个参数数组，如果这个数组里面传入的数据不变，那么这个useMemo返回的数据是之前里面return的数据。

- 在具体项目中，如果你的页面上展示的数据是通过某个（某些）state计算得来的一个数据，那么你每次这个组件里面无关的state变化引起的重新渲染，都会去计算一下这个数据，这时候就需要用useMemo(()=>{}, [])去包裹你的计算的方法体，这样那些无关的state改变引起的渲染不会重新计算这个方法体，而是返回之前计算的结果，达到一种缓存的效果。

```javaScript
function WithMemo() {
    const [count, setCount] = useState(1);
    const [val, setValue] = useState('');
    const expensive = useMemo(() => {
        console.log('compute');
        let sum = 0;
        for (let i = 0; i < count * 100; i++) {
            sum += i;
        }
        return sum;
    }, [count]);
 
    return <div>
        <h4>{count}-{expensive}</h4>
        {val}
        <div>
            <button onClick={() => setCount(count + 1)}>+c1</button>
            <input value={val} onChange={event => setValue(event.target.value)}/>
        </div>
    </div>;
}

```
4.useCallback使用场景
- useCallback跟useMemo比较类似，但它返回的是缓存的函数。

- hooks组件state改变后会引起父组件的重新渲染，而每次重新渲染都会生成一个新函数，所以react子组件props在浅比较的时候就会认为props改变了，引起子组件不必要的渲染。

- 使用场景是：有一个父组件，其中包含子组件，子组件接收一个函数作为props；通常而言，如果父组件更新了，子组件也会执行更新；但是大多数场景下，更新是没有必要的，我们可以借助useCallback来返回函数，然后把这个函数作为props传递给子组件；这样，子组件就能避免不必要的更新。

- 为什么useCallback需要配合React.memo来使用？

- react的Hooks组件对props的浅比较是在memo里面比较的（类组件是在shouldComponentUpdate里面），如果没有memo，那么你使用useCallback就没啥意义，反而浪费性能（因为useCallback来包裹函数也是需要开销的）。因为子组件还是会重新渲染。
- 练习组件地址src\components\studyHooksBase\BaseHook.js
```javaScript
APP() {
    const [value, setValue] = useState(123)
    const [otherValue, setOtherValue] = useState(999)

    const changeValue = useCallback(() => {
        setValue(value => value+1)
    }, [])
    
    console.log('APP');

    return (
        <div>
            <div>与Message渲染无关的数据==={otherValue}</div>
            <br />
            <button onClick={() => setOtherValue(value => value-=5)}>改变无关的数据</button>
            <br />
            <br />
            <Message value={value} changeValue={changeValue} />
        </div>
    )
}
const Message = memo(
    function Message({value, changeValue}) {
    
        console.log('Message');
    
        return (
            <div>
                <button onClick={changeValue}>改变有关数据</button>
                <p>与Message渲染有关的数据{value}</p>
            </div>
        )
    }
)
```

