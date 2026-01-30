#В данном репозитории применяется ряд различных хуков для получения желаемого эфекта т.к. как опыт у меня маловат сказать, что тот или иной хук применятеся правильно, не могу. Но я работаю над этим... =)  
  
И так основной хук который я использовал это useState, useEffect и useContext.  
  
Проведя иследования и изучив не мало информации могу рассказать следующее.  

useContext для чего он нужент?  
    Он нужен для того чтобы получить данные из context в любом дочернем компоненте(ДК) без использования props drilling(т.е Нам не нужно будет передавать какую то информацию от родительского компонента(РК) к ДК через props). Важно чтобы РК был обернут в Provider-компонент
  
*А как он работает?*  
    При создании context (const MyComponent = createContext()) создается объект контейнер с начальным значением (_currentValue: *начальное значение*). Далее, чтобы получать из этого объекта значения необходимо создать Provider-компонент. Он обновляет значение в _currentValue. Когда компонент вызавает useContext(MyComponent) или кастомный хук который содержит useContext(MyComponent), React считывает значение (MyComponent._currentValue ), которое было установлено ближайшим Provider во время рендера и возвращает его текущее значение.
Пример на моем репозитории
```
    //1. Создание
    const TimerContext = createContext() // ._currentValue: undefined
    //2. Provider 
    export const TimerProvider = ({children}) => {
    const [isExpired, setIsExpired] = useState()

    // Provider устанавливает значение
    return (
        <TimerContext value ={{isExpired, expiredTimer}}>
            {children}
        </TimerContext>
    )
    //Provider ._currentValue = {isExpired, expiredTimer}
    };
```
// кастомный хук считывает значение
const useTimer = () => useContext(TimerContext)

Исходя из приведенного выше кода можно понять для чего нужен Provider-компонент. Без него значение ._currentValue: всегда будет undefined.  
Потому что  
context - это пассивный объект. Он только хранит значение  
Provider — активный компонент: Он "активирует" контекст, записывая в него значение  
useContext — читатель: Он только читает то, что уже записано  
  
Подробные дополнения:
  
Из чего состоит и как выглядит созданый объект - createContext().
```
// Укажем дефолтное значение чтобы легче было отслеживать
     const Context = createContext('defaultValue')
{
    $$typeof: Symbol(react.context)
    >Consumer: {$$typeof: Symbol(react.consumer, _context:{...})}
    >Provider: {$$typeof: Symbol(rect.context, _currentValue: 'defaulValue', _currentValue2: 'defaulValue'...)}
    _currentRenderer: null
    _currentRenderer2: null
    _currentValue: "defaultValue"
    _currentValue2: "defaultValue"
    _threadCount: 0
}
```
Интересно заметить что значение меняется в нескольких местах. Почему так? Спросите вы.  
Как мне кажется для изоляций значений, быстрый прямой доступ = React читает из ближайшей копии  
https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiberNewContext.js ссылка на код исходника Provider  
https://github.com/facebook/react/blob/main/packages/react/src/ReactContext.js ссылка на исходный код создания context  
  
._currentValue  
При создании context, _currentValue действительно undefined. Значение устанавливается только во время рендера Provider  
  
  
Документация, Статьи и прочее.  
https://daveceddia.com/usecontext-hook/  
https://react.dev/reference/react/useContext  
https://www.robinwieruch.de/react-context/  
  -----------------------------------------------------------------------------------------------------------------------------------------
useEffect()   
Нужен для выполнения побочных эффектов в функциональных компонентах(ФК)  
Побочные эффекты примеры:  
    1.Запросы к API (fetch, axios)  
    2.Работа с DOM на прямую  
    3.Подписка на события (addEventListener)  
    4.Таймеры(setTimeout, setInterval)  
    5.Работа с localStorage и SessionStorage  
  
Стоит контролировать массив зависимостей  
```
useEffect(()> {

},) <-- если будет пусто = Выполняется каждый рендер, может быть слишком много вызовов

useEffect(() => {

}, []) <-- Пустой массив: Выполняется при монтировании и размонтировании

useEffect(() => {

}, [user]) <--Зависимость в массиве: Выполняется когда значение поменялось


const [count, setCount] = useState(0)
useEffect(() => {
    serCount(count + 1)
}, [count]) <-- Бесконечный цикл. в useEffect выполняется setCount обновляет переменную count. Массив зависимостей [count] заставляет useEffect выполниться снова и так бесконечно...
```
Как решить проблему
1) Убрать зависимости и использовать функциональную форму setCount(prev => prev + 1)
2) Использовать условие if(count < 10) {setCount(prev => prev + 1)} цикл остановится на 10
