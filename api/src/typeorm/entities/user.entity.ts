import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column,
    OneToMany,
    ManyToMany,
    OneToOne,
    JoinTable,
    JoinColumn,
} from "typeorm"
import { BaseEntity } from "./base.entity";
import { Perk } from "./perk.entity";
import { Recommendation } from "./recommendation.entity";
import { Profile } from "./profile.entity";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column({default: true})
    isActive: boolean;

    @Column({nullable: true})
    phone?: string;

    @Column({ type: 'date',nullable: true})
    dob?: Date;

    @Column({ type: 'int',nullable: true})
    daysActive?: number;

    @OneToMany(
        () => Recommendation,
        (recommendation) => recommendation.user
    )
    recommendation: Recommendation[]

    @ManyToMany(
        () => Perk,
        (perk) => perk.users
    )
    perks: Perk


    @OneToOne(
        () => Profile 
    )
    @JoinColumn()
    profile: Profile
}