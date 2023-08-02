import React, { useDeferredValue, useEffect, useState, useTransition } from 'react'
import { Form,Button } from 'react-bootstrap';

const TestingDemo = () => {
    const [name, setName] = useState('')
    const [list, setList] = useState([])
    const [isPending, startTransition] = useTransition();
    const [withTransition, setWithTransition] = useState('')
    const [listTransition, setListTransition] = useState([]);
    const [count,setCount] = useState(0)
    const deferedCount = useDeferredValue(count);
    
    const ListSize = 10000;

    const handleChange = (e) => {
        const { value } = e.target;
        setName(value);
        const dataList = []
        for (let i = 0; i < ListSize; i++) {
            dataList.push(value);
        }
        setList(dataList)
    }

    const handleTransitionChange = (e) => {
        const { value } = e.target;
        setWithTransition(value);

        startTransition(() => {
            const dataList = [];
            for (let i = 0; i < ListSize; i++) {
                dataList.push(value);
            }
            setListTransition(dataList);
        });
    }

    const handleDefferClick = () => {
        setCount(c => c+1)
    }
    useEffect(() => {
        console.log(`counterValue${count}`);
        console.log(`DefferValue${deferedCount}`)
    })
    return (
        <>
            <Form>
                <div className='row'>
                    <div className='col-lg-12 d-flex'>
                       <span className='col-lg-6 d-flex align-items-center justify-content-center flex-column'>
                       <Button onClick={handleDefferClick}>Deffered Hook</Button>
                        Check Console.log
                       </span>
                       <span className='col-lg-6'>
                        Suppose If you want fetch data from backend but, that depends on user's Inputs in that case we can use useDefferedValue Hook.So once we get the data from the backend we can call the useDefferedValue hook and print our result in the UI
                       </span>
                    </div>
                    <hr/>
                    <div className='col-lg-12 d-flex'>
                        <span className='col-lg-6'>
                            <div><strong>Here our list is so big  looping over it 10000 times and saving each value we type and rendering it all on the screen takes a long time and will be very slow to process the older devices</strong></div>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Without Transition</Form.Label>
                                <Form.Control type="text" placeholder="Without Transitio Hook" value={name} onChange={handleChange} />
                            </Form.Group>
                            {list.map((list, index) => {
                                return <div key={index}>{list}</div>;
                            })}
                        </span>

                        <span className='col-lg-6'>
                            <div><strong>The useTransition hook enables us to mark some state modifications as unimportant. These states updates will be performed in parallel with other state updates but the rendering of the component will not be delyed.</strong></div>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>With Transition</Form.Label>
                                <Form.Control type="text" placeholder="Transition Hook" value={withTransition} onChange={handleTransitionChange} />
                            </Form.Group>
                            {isPending ? (
                                <div>Loading...</div>
                            ) : (
                                listTransition.map((list, index) => {
                                    return <div key={index}>{list}</div>;
                                })
                            )}
                        </span>
                    </div>
                </div>
            </Form>
        </>
    )
}

export default TestingDemo