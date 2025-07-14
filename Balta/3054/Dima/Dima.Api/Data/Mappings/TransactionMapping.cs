using Dima.Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Dima.Api.Data.Mappings;

public class TransactionMapping : IEntityTypeConfiguration<Transaction>
{
    public void Configure(EntityTypeBuilder<Transaction> builder)
    {
        // Configuração da tabela
        builder.ToTable("Transactions");

        // Configuração da chave primária
        builder.HasKey(t => t.Id);
        builder.Property(t => t.Id)
            .HasColumnName("Id")
            .ValueGeneratedOnAdd()
            .IsRequired(true);

        // Configuração do título
        builder.Property(t => t.Title)
            .HasColumnName("Title")
            .HasMaxLength(80)
            .IsRequired(true);

        // Configuração do tipo de transação
        builder.Property(t => t.Type)
            .HasColumnName("Type")
            .IsRequired(true);

        // Configuração do valor
        builder.Property(t => t.Amount)
            .HasColumnName("Amount")
            .HasPrecision(18, 2)
            .IsRequired(true);

        // Configuração das datas
        builder.Property(t => t.CreatedAt)
            .HasColumnName("CreatedAt")
            .IsRequired(true);

        builder.Property(t => t.PaidOrReceivedAt)
            .HasColumnName("PaidOrReceivedAt")
            .IsRequired(false);

        // Configuração da chave estrangeira CategoryId
        builder.Property(t => t.CategoryId)
            .HasColumnName("CategoryId")
            .IsRequired(true);

        // Configuração do UserId
        builder.Property(t => t.UserId)
            .HasColumnName("UserId")
            .HasMaxLength(160)
            .IsRequired(true);

        // Configuração do relacionamento com Category
        builder.HasOne(t => t.Category)
            .WithMany()
            .HasForeignKey(t => t.CategoryId)
            .HasConstraintName("FK_Transactions_Categories_CategoryId")
            .OnDelete(DeleteBehavior.Restrict);

        // Índices para melhorar performance
        builder.HasIndex(t => t.UserId)
            .HasDatabaseName("IX_Transactions_UserId");

        builder.HasIndex(t => t.CategoryId)
            .HasDatabaseName("IX_Transactions_CategoryId");

        builder.HasIndex(t => new { t.UserId, t.CreatedAt })
            .HasDatabaseName("IX_Transactions_UserId_CreatedAt");

        builder.HasIndex(t => new { t.UserId, t.Type })
            .HasDatabaseName("IX_Transactions_UserId_Type");
    }
}