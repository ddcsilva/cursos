using Dima.Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Dima.Api.Data.Mappings;

public class CategoryMapping : IEntityTypeConfiguration<Category>
{
    public void Configure(EntityTypeBuilder<Category> builder)
    {
        // Configuração da tabela
        builder.ToTable("Categories");

        // Configuração da chave primária
        builder.HasKey(c => c.Id);
        builder.Property(c => c.Id)
            .HasColumnName("Id")
            .HasColumnType("BIGINT")
            .ValueGeneratedOnAdd()
            .IsRequired(true);

        // Configuração do título
        builder.Property(c => c.Title)
            .HasColumnName("Title")
            .HasColumnType("NVARCHAR")
            .HasMaxLength(80)
            .IsRequired(true);

        // Configuração da descrição
        builder.Property(c => c.Description)
            .HasColumnName("Description")
            .HasColumnType("NVARCHAR")
            .HasMaxLength(255)
            .IsRequired(false);

        // Configuração do UserId
        builder.Property(c => c.UserId)
            .HasColumnName("UserId")
            .HasColumnType("NVARCHAR")
            .HasMaxLength(160)
            .IsRequired(true);

        // Índices para melhorar performance
        builder.HasIndex(c => c.UserId)
            .HasDatabaseName("IX_Categories_UserId");

        builder.HasIndex(c => new { c.UserId, c.Title })
            .HasDatabaseName("IX_Categories_UserId_Title")
            .IsUnique(true);
    }
}