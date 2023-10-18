import React from 'react';
import { Grid } from '@material-ui/core';

import Product from './Product/Product';
import useStyles from './styles';

import  fotoTeclado  from '../../assets/teclado2.jpg';
import  fotoBass  from '../../assets/bassCort.jpg';

import fotoLtd from '../../assets/bassLtd.jpg';
import fotoAmpOrange from '../../assets/bassampOrange.jpg';
import fotoAudifonos from '../../assets/audifonos.jpg';
import fotoFender from '../../assets/fenderRumble.jpg';
import fotoInterfaz from '../../assets/interfazAudio.jpg';
import fotoMidi from '../../assets/keyboardMidi.jpg';
import fotoMonitores from '../../assets/monitores.png';

const fotosProductos = [
    { id: 1, name: 'teclado', image: fotoTeclado },
    { id: 2, name: 'bajoCort', image: fotoBass },
    { id: 3, name: 'bajoLtd', image: fotoLtd},
    { id: 4, name: 'amp Orange', image: fotoAmpOrange },
    { id: 5, name: 'audifonos', image: fotoAudifonos},
    { id: 6, name: 'amp Fender', image: fotoFender},
    { id: 7, name: 'interfaz audio', image: fotoInterfaz},
    { id: 8, name: 'keyboard midi', image: fotoMidi },
    { id: 9, name: 'monitores estudio', image: fotoMonitores },
];


const Products = ({ products, onAddToCart }) => {
    const classes = useStyles();

    return (
        <main className={classes.content}>
            <div className={classes.toolbar} />
            <Grid container justify="center" spacing={4}>
                {products.map((product,i) => (
                    
                    <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>                        
                        <Product product={product} foto={fotosProductos[i].image} onAddToCart={onAddToCart} />
                    </Grid>
                ))                
                }
            </Grid>
        </main>
    )
    
}

export default Products;
