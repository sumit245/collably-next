import { Minus, Plus, Trash2 } from 'lucide-react';
import styles from '../cart/styleCart.module.css';

export function CartItem({ item, onUpdateQuantity, onRemove }) {
  return (
    <div className={styles.cartItem}>
      <div className={styles.itemInfo}>
        <img src={item.image} alt={item.name} className={styles.itemImage} />
        <div>
          <h3 className={styles.itemName}>{item.name}</h3>
          <p className={styles.itemPrice}>₹{item.price.toFixed(2)}</p>
        </div>
      </div>
      <div className={styles.itemActions}>
        <div className={styles.quantityControl}>
          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
            className={styles.quantityButton}
            disabled={item.quantity <= 1}
            aria-label="Decrease quantity"
          >
            <Minus size={16} />
          </button>
          <span className={styles.quantity}>{item.quantity}</span>
          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            className={styles.quantityButton}
            aria-label="Increase quantity"
          >
            <Plus size={16} />
          </button>
        </div>
        <button 
          onClick={() => onRemove(item.id)} 
          className={styles.removeButton}
          aria-label="Remove item"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
}