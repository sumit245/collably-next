import styles from '../brand/target.module.css';
import { fakeItems } from '../utils.faker';

const TargetSection = ({targetData}) => {
  return (
    <section className={styles.targetSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>{targetData.heading}</h2>
        <div className={styles.items}>
          {targetData.items.map((item, index) => (
            <div key={index} className={styles.item}>
              <div className={styles.iconWrapper}>
                <span className={styles.icon}>{item.icon}</span>
              </div>
              <h3 className={styles.itemTitle}>{item.title}</h3>
              <p className={styles.itemDescription}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TargetSection;