import {Entity,Column,PrimaryGeneratedColumn,ManyToOne} from 'typeorm';
import {Role} from './role.entity';

@Entity('users')
 export class User{
    @PrimaryGeneratedColumn()
    id:number;
    @Column({unique:true})
    username:string;
    @Column({unique:true})
    email:string;
    @Column()
    passwordHash:string;
    @Column({ default: true })
    isActive: boolean;
  
    @ManyToOne(() => Role, (role) => role.users)
    role: Role;
 }
 
