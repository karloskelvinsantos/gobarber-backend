import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';

import User from './User';

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(type => User, { eager: true })
  @JoinColumn({
    name: "provider_id",
    referencedColumnName: "id",
  })
  provider: User;

  @Column({ type: "timestamptz" })
  date: Date;

  @CreateDateColumn({ name: "created_at", type: "timestamp", default: () => 'NOW()' })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp", default: () => 'NOW()', nullable: true })
  updatedAt: Date;
}

export default Appointment;