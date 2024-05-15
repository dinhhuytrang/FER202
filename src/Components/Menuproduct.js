import React from 'react'
import { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'

function Menuproduct() {
    const [categories, setCategories] = useState([])
    useEffect(() => {
        fetch('http://localhost:9999/categories')
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log(data);
                setCategories(data);
            });
    }, []);
    return (
        <Container>
            <ol>
                {categories.map((category) =>
                    <li key={category.id}>{category.name}</li>
                )}
            </ol>
        </Container>


    )
}

export default Menuproduct
