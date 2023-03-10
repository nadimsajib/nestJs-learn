import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column,
    ManyToOne,
} from "typeorm"
import { BaseEntity } from "./base.entity";
import { User } from "./user.entity";

@Entity()
export class Recommendation extends BaseEntity {
    @Column()
    description: string;

    @ManyToOne(
        () => User,
        (user) => user.recommendation
    )
    user: User;

}