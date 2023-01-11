import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
export class GenriqueModule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    update: false,
  })
  create_at: Date;

  @UpdateDateColumn()
  update_at: Date;

  @DeleteDateColumn()
  delete_at: Date;
}
